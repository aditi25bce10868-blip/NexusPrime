// In-memory storage (replace with database in production)
let items = [
  {
    id: '1',
    name: 'Sample Item 1',
    description: 'This is a sample item',
    price: 29.99,
    category: 'Electronics',
    createdAt: new Date(),
    userId: '1'
  },
  {
    id: '2',
    name: 'Sample Item 2',
    description: 'Another sample item',
    price: 49.99,
    category: 'Books',
    createdAt: new Date(),
    userId: '1'
  }
];

// @desc    Get all items
// @route   GET /api/items
// @access  Public
exports.getAllItems = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filteredItems = [...items];

    // Filter by category
    if (category) {
      filteredItems = filteredItems.filter(
        item => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Search by name or description
    if (search) {
      filteredItems = filteredItems.filter(
        item =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json({
      status: 'success',
      count: filteredItems.length,
      data: { items: filteredItems }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
exports.getItemById = async (req, res) => {
  try {
    const item = items.find(i => i.id === req.params.id);

    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Item not found'
      });
    }

    res.json({
      status: 'success',
      data: { item }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Create new item
// @route   POST /api/items
// @access  Private
exports.createItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Validation
    if (!name || !price) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide name and price'
      });
    }

    const newItem = {
      id: String(items.length + 1),
      name,
      description: description || '',
      price: parseFloat(price),
      category: category || 'Uncategorized',
      createdAt: new Date(),
      userId: req.user.id
    };

    items.push(newItem);

    res.status(201).json({
      status: 'success',
      data: { item: newItem }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
exports.updateItem = async (req, res) => {
  try {
    const itemIndex = items.findIndex(i => i.id === req.params.id);

    if (itemIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Item not found'
      });
    }

    // Check if user owns the item
    if (items[itemIndex].userId !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this item'
      });
    }

    const { name, description, price, category } = req.body;

    // Update fields
    if (name) items[itemIndex].name = name;
    if (description) items[itemIndex].description = description;
    if (price) items[itemIndex].price = parseFloat(price);
    if (category) items[itemIndex].category = category;
    items[itemIndex].updatedAt = new Date();

    res.json({
      status: 'success',
      data: { item: items[itemIndex] }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
exports.deleteItem = async (req, res) => {
  try {
    const itemIndex = items.findIndex(i => i.id === req.params.id);

    if (itemIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Item not found'
      });
    }

    // Check if user owns the item
    if (items[itemIndex].userId !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this item'
      });
    }

    items.splice(itemIndex, 1);

    res.json({
      status: 'success',
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
