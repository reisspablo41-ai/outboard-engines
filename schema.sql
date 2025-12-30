Unified Supabase Schema – Marine E‑Commerce (MVP)

This is a simple, unified, production‑ready schema for your marine e‑commerce platform using Supabase (Postgres).

Design goals:
	•	ONE products table
	•	Clear separation of concerns
	•	Easy to query
	•	Easy to scale later
	•	Zero over‑engineering

⸻

1️⃣ Core Reference Tables

brands

id uuid PRIMARY KEY DEFAULT gen_random_uuid()
name text UNIQUE NOT NULL
slug text UNIQUE NOT NULL
created_at timestamp DEFAULT now()

categories

id uuid PRIMARY KEY DEFAULT gen_random_uuid();
name text NOT NULL;
slug text UNIQUE NOT NULL;
created_at timestamp DEFAULT now();

subcategories

id uuid PRIMARY KEY DEFAULT gen_random_uuid();
category_id uuid REFERENCES categories(id) ON DELETE CASCADE;
name text NOT NULL;
slug text UNIQUE NOT NULL;
description text;
created_at timestamp DEFAULT now();


⸻

2️⃣ Products (ALL products live here)

products

id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
type text CHECK (type IN ('part','prop','motor','boat')) NOT NULL,
brand_id uuid REFERENCES brands(id),
category_id uuid REFERENCES categories(id),
subcategory_id uuid REFERENCES subcategories(id), -- added for finer grain classification
name text NOT NULL,
sku text UNIQUE,
price numeric,
stock integer,
description text,       -- new column for category description
specs jsonb,
created_at timestamp DEFAULT now()

Notes
	•	type controls behavior (checkout vs lead)
	•	price & stock used only for part and prop
	•	sku required only for sellable items
	•	specs stores flexible data:
	•	Motors → HP, shaft, fuel
	•	Boats → length, capacity
	•	Props → pitch, diameter

⸻

3️⃣ Product Media

product_images

id uuid PRIMARY KEY DEFAULT gen_random_uuid()
product_id uuid REFERENCES products(id) ON DELETE CASCADE
image_url text NOT NULL
created_at timestamp DEFAULT now()


⸻

4️⃣ Compatibility (Fitment Logic)

compatibility

id uuid PRIMARY KEY DEFAULT gen_random_uuid()
product_id uuid REFERENCES products(id) ON DELETE CASCADE
year integer
make text
model text
engine_hp integer

Purpose
	•	Used ONLY for parts & propellers
	•	Enables Year‑Make‑Model search
	•	Prevents wrong‑fit purchases

⸻

5️⃣ Orders (Parts & Props only)

orders

id uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id uuid REFERENCES auth.users(id)
status text CHECK (status IN ('pending','paid','shipped','completed','cancelled'))
total numeric NOT NULL
created_at timestamp DEFAULT now()

order_items

id uuid PRIMARY KEY DEFAULT gen_random_uuid()
order_id uuid REFERENCES orders(id) ON DELETE CASCADE
product_id uuid REFERENCES products(id)
quantity integer NOT NULL
unit_price numeric NOT NULL


⸻

6️⃣ Orders (All Customer Requests)

orders

id uuid PRIMARY KEY DEFAULT gen_random_uuid()
product_id uuid REFERENCES products(id)
user_id uuid REFERENCES auth.users(id)
full_name text NOT NULL
email text NOT NULL
phone text
shipping_address text
status text CHECK (status IN ('pending','paid','shipped','completed','cancelled','inquiry'))
total numeric
created_at timestamp DEFAULT now()

Notes
	•	Used for paid orders (parts & props)
	•	Used for inquiries (boats & motors)
	•	status = 'inquiry' means no payment yet
	•	Financing handled outside the system

⸻

7️⃣ Recommended Indexes

CREATE INDEX ON products (type);
CREATE INDEX ON products (sku);
CREATE INDEX ON compatibility (year, make, model);
CREATE INDEX ON compatibility (product_id);


⸻

8️⃣ Behavior Rules (App Logic)
	•	type IN ('part','prop') → Add to cart
	•	type IN ('boat','motor') → Request quote
	•	Compatibility queried only for parts & props

⸻

9️⃣ Why This Schema Is Correct

✅ One products table
✅ No duplication
✅ Fast queries
✅ Mobile‑friendly
✅ Supabase‑native

You can later add:
	•	Reviews
	•	Blog posts
	•	Services
	•	Advanced CRM

Without breaking anything.

⸻

✅ MVP‑Ready

This schema is enough to:
	•	Launch
	•	Sell
	•	Capture leads
	•	Scale safely