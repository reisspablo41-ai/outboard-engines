-- =============================
-- Extensions
-- =============================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================
-- Brands
-- =============================
CREATE TABLE brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamp DEFAULT now()
);

-- =============================
-- Categories
-- =============================
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamp DEFAULT now()
);

-- =============================
-- Products (ALL product types)
-- type: part | prop | motor | boat
-- =============================
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text CHECK (type IN ('part','prop','motor','boat')) NOT NULL,
  brand_id uuid REFERENCES brands(id),
  category_id uuid REFERENCES categories(id),
  name text NOT NULL,
  sku text UNIQUE,
  price numeric,
  stock integer,
  specs jsonb,
  created_at timestamp DEFAULT now()
);

-- =============================
-- Product Images
-- =============================
CREATE TABLE product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  created_at timestamp DEFAULT now()
);

-- =============================
-- Compatibility (fitment for parts & props)
-- =============================
CREATE TABLE compatibility (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  year integer,
  make text,
  model text,
  engine_hp integer
);

-- =============================
-- Orders (paid orders + inquiries)
-- status: inquiry | pending | paid | shipped | completed | cancelled
-- =============================
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  user_id uuid REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  shipping_address text,
  status text CHECK (
    status IN ('inquiry','pending','paid','shipped','completed','cancelled')
  ) NOT NULL,
  total numeric,
  created_at timestamp DEFAULT now()
);

-- =============================
-- Order Items (used only for parts & props)
-- =============================
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL,
  unit_price numeric NOT NULL
);

-- =============================
-- Indexes
-- =============================
CREATE INDEX ON products (type);
CREATE INDEX ON products (sku);
CREATE INDEX ON compatibility (year, make, model);
CREATE INDEX ON compatibility (product_id);
CREATE INDEX ON orders (status);