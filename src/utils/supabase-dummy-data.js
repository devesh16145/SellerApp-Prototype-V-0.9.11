import { v4 as uuidv4 } from 'uuid';

// Use fixed IDs for existing users/profiles
const USER_1_ID = '4ff051f4-5222-4ef5-a334-cc935e52af1a';
const USER_2_ID = 'e20fb341-3f17-4bc7-a55f-4432ae889f10';
const PRODUCT_1_ID = uuidv4();
const PRODUCT_2_ID = uuidv4();
const ORDER_1_ID = uuidv4();
const ORDER_2_ID = uuidv4();

const dummyAddresses = [
  {
    id: uuidv4(),
    profile_id: USER_1_ID,
    address_line1: '123 Main St',
    address_line2: 'Suite 100',
    city: 'Mumbai',
    state: 'Maharashtra',
    postal_code: '400001',
    country: 'India',
    is_default: true
  },
  {
    id: uuidv4(),
    profile_id: USER_2_ID,
    address_line1: '456 Market St',
    address_line2: 'Floor 2',
    city: 'Delhi',
    state: 'Delhi',
    postal_code: '110001',
    country: 'India',
    is_default: true
  }
];

const dummyProducts = [
  {
    id: PRODUCT_1_ID,
    seller_id: USER_1_ID,
    name: 'Organic Rice',
    description: 'Premium quality organic rice',
    price: 150.00,
    stock_quantity: 100,
    category: 'Grains',
    status: 'active'
  },
  {
    id: PRODUCT_2_ID,
    seller_id: USER_2_ID,
    name: 'Fresh Tomatoes',
    description: 'Farm fresh tomatoes',
    price: 40.00,
    stock_quantity: 50,
    category: 'Vegetables',
    status: 'active'
  }
];

function generateOrderNumber() {
  return `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

const dummyOrders = [
  {
    id: ORDER_1_ID,
    seller_id: USER_1_ID,
    buyer_name: 'Customer One',
    total_amount: 300.00,
    status: 'completed',
    order_date: new Date().toISOString(),
    order_number: generateOrderNumber()
  },
  {
    id: ORDER_2_ID,
    seller_id: USER_2_ID,
    buyer_name: 'Customer Two',
    total_amount: 200.00,
    status: 'processing',
    order_date: new Date().toISOString(),
    order_number: generateOrderNumber()
  }
];

const dummyOrderItems = [
  {
    id: uuidv4(),
    order_id: ORDER_1_ID,
    product_id: PRODUCT_1_ID,
    quantity: 2,
    price_per_unit: 150.00
  },
  {
    id: uuidv4(),
    order_id: ORDER_2_ID,
    product_id: PRODUCT_2_ID,
    quantity: 5,
    price_per_unit: 40.00
  }
];

const dummyTodos = [
  {
    id: uuidv4(),
    profile_id: USER_1_ID,
    title: 'Update inventory',
    description: 'Check and update stock levels',
    due_date: new Date(Date.now() + 86400000).toISOString(),
    status: 'pending'
  },
  {
    id: uuidv4(),
    profile_id: USER_2_ID,
    title: 'Contact supplier',
    description: 'Discuss next shipment details',
    due_date: new Date(Date.now() + 172800000).toISOString(),
    status: 'pending'
  }
];

const dummySellerTips = [
  {
    id: uuidv4(),
    title: 'Improve Your Product Photos',
    content: 'Use high-quality images with good lighting to showcase your products better.',
    category: 'Marketing'
  },
  {
    id: uuidv4(),
    title: 'Optimize Your Pricing',
    content: 'Regularly review and adjust your prices based on market trends and competition.',
    category: 'Business'
  }
];

async function insertDummyAddresses(supabase) {
  console.log('Inserting dummy addresses...');
  const { error } = await supabase
    .from('addresses')
    .insert(dummyAddresses);

  if (error) {
    console.error('Error inserting addresses:', error);
  }
}

async function insertDummyProducts(supabase) {
  console.log('Inserting dummy products...');
  const { error } = await supabase
    .from('products')
    .insert(dummyProducts);

  if (error) {
    console.error('Error inserting products:', error);
  }
}

async function insertDummyOrders(supabase) {
  console.log('Inserting dummy orders...');
  const { error } = await supabase
    .from('orders')
    .insert(dummyOrders);

  if (error) {
    console.error('Error inserting orders:', error);
  }
}

async function insertDummyOrderItems(supabase) {
  console.log('Inserting dummy order items...');
  // First, disable RLS for this operation
  const { error: rlsError } = await supabase.rpc('disable_rls');
  if (rlsError) {
    console.error('Error disabling RLS:', rlsError);
    return;
  }

  const { error } = await supabase
    .from('order_items')
    .insert(dummyOrderItems);

  if (error) {
    console.error('Error inserting order items:', error);
  }

  // Re-enable RLS after insertion
  await supabase.rpc('enable_rls');
}

async function insertDummyTodos(supabase) {
  console.log('Inserting dummy todos...');
  const { error } = await supabase
    .from('todos')
    .insert(dummyTodos);

  if (error) {
    console.error('Error inserting todos:', error);
  }
}

async function insertDummySellerTips(supabase) {
  console.log('Inserting dummy seller tips...');
  const { error } = await supabase
    .from('seller_tips')
    .insert(dummySellerTips);

  if (error) {
    console.error('Error inserting seller tips:', error);
  }
}

export async function populateDummyData(supabase) {
  try {
    await insertDummyAddresses(supabase);
    await insertDummyProducts(supabase);
    await insertDummyOrders(supabase);
    await insertDummyOrderItems(supabase);
    await insertDummyTodos(supabase);
    await insertDummySellerTips(supabase);
    console.log('All dummy data insertion processes completed.');
  } catch (error) {
    console.error('Error in populateDummyData:', error);
    throw error;
  }
}
