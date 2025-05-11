const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;
const prisma = new PrismaClient();

// @desc    Create new company
// @route   POST /api/companies
// @access  Private
exports.createCompany = async (req, res) => {
  try {
    const { name, industry, website, location, tags, notes } = req.body;
    
    if (!name || !industry) {
      return res.status(400).json({ error: 'Name and industry are required' });
    }

    // Handle logo upload
    let logoData = {};
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'placement-tracker/companies',
        use_filename: true,
      });
      logoData = {
        logo: result.secure_url,
        logoPublicId: result.public_id,
      };
    }

    const company = await prisma.company.create({
      data: {
        name,
        industry,
        website: website || '',
        location: location || '',
        notes: notes || '',
        tags: tags ? tags.split(',') : [],
        createdBy: req.user.id,
        ...logoData,
      },
    });

    res.status(201).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all companies
// @route   GET /api/companies
// @access  Private
exports.getAllCompanies = async (req, res) => {
  try {
    const { page = 1, limit = 10, industry, tags, search } = req.query;
    const skip = (page - 1) * limit;
    
    const where = {
      createdBy: req.user.id,
      AND: []
    };

    if (industry) {
      where.AND.push({ industry: { equals: industry, mode: 'insensitive' } });
    }

    if (tags) {
      where.AND.push({ tags: { hasEvery: tags.split(',') } });
    }

    if (search) {
      where.AND.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { industry: { contains: search, mode: 'insensitive' } },
          { notes: { contains: search, mode: 'insensitive' } },
        ]
      });
    }

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.company.count({ where }),
    ]);

    res.json({
      data: companies,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Private
exports.getCompanyById = async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id: req.params.id },
      include: {
        employees: true,
        applications: {
          select: {
            id: true,
            position: true,
            status: true,
            appliedDate: true,
          }
        }
      }
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    if (company.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json({
      ...company,
      employees: company.employees.length,
      applications: company.applications.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update company
// @route   PATCH /api/companies/:id
// @access  Private
exports.updateCompany = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, industry, website, location, tags, notes } = req.body;
      
      // Verify company exists and belongs to user
      const existingCompany = await prisma.company.findUnique({
        where: { id }
      });
  
      if (!existingCompany) {
        return res.status(404).json({ error: 'Company not found' });
      }
  
      if (existingCompany.createdBy !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }
  
      // Handle logo update
      let logoData = {};
      if (req.file) {
        // Delete old logo if exists
        if (existingCompany.logoPublicId) {
          await cloudinary.uploader.destroy(existingCompany.logoPublicId);
        }
        
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'placement-tracker/companies'
        });
        logoData = {
          logo: result.secure_url,
          logoPublicId: result.public_id
        };
      }
  
      const updatedCompany = await prisma.company.update({
        where: { id },
        data: {
          name: name || existingCompany.name,
          industry: industry || existingCompany.industry,
          website: website || existingCompany.website,
          location: location || existingCompany.location,
          notes: notes || existingCompany.notes,
          tags: tags ? tags.split(',') : existingCompany.tags,
          ...logoData
        }
      });
  
      res.json(updatedCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // @desc    Delete company
  // @route   DELETE /api/companies/:id
  // @access  Private
  exports.deleteCompany = async (req, res) => {
    try {
      const { id } = req.params;
  
      const company = await prisma.company.findUnique({
        where: { id }
      });
  
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
  
      if (company.createdBy !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }
  
      // Delete logo from Cloudinary
      if (company.logoPublicId) {
        await cloudinary.uploader.destroy(company.logoPublicId);
      }
  
      // Prisma will cascade delete related records if relations are properly configured
      await prisma.company.delete({
        where: { id }
      });
  
      res.json({ message: 'Company deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // @desc    Get company statistics
  // @route   GET /api/companies/stats
  // @access  Private
  exports.getCompanyStats = async (req, res) => {
    try {
      // Industry distribution
      const industryStats = await prisma.company.groupBy({
        by: ['industry'],
        where: { createdBy: req.user.id },
        _count: { industry: true },
        orderBy: { _count: { industry: 'desc' } }
      });
  
      // Application status distribution
      const applicationStats = await prisma.application.groupBy({
        by: ['status'],
        where: {
          company: {
            createdBy: req.user.id
          }
        },
        _count: { status: true },
        orderBy: { _count: { status: 'desc' } }
      });
  
      res.json({
        industryStats: industryStats.map(stat => ({
          industry: stat.industry,
          count: stat._count.industry
        })),
        applicationStats: applicationStats.map(stat => ({
          status: stat.status,
          count: stat._count.status
        }))
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };