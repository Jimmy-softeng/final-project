# final-project
FRONTEND
BACKEND
 CUSTOMER
  -LIST OF GOODS
  -BUY/PAYMENT
  -CUSTOMER STATEMENT
  -CUSTOMER REPORTS
  -CUSTOMER STATEMENTS

 STOREKEEPER
   
   -SUPPLIERS/COMPANIES
   -STOCK INVENTORY

MANAGER
   -STOREKEEPER
   -CUSTOMER
   -SUPPLIER
   -STOCK INVENTORY
   -CUSTOMERS
SUPERADMIN
   -CUSTOMER
   -COMPANIES
   -STOCKINVENTORY
   -SALES
   -BANK AND PAYMENTS
   -ANALYTICS AND REPORTS

FOLDER STRUCTURE
   project_root/
├── server/
│   ├── config.py
│   ├── extensions.py
    ├──app.py
    ├──
│   ├── shared/
│   │   ├── __init__.py
│   │   ├── models/
│   │   │   └── user.py
│   │   ├── mixins/
│   │   │   └── serialize_mixin.py
│   │   └── utils/
│   │       └── jwt_utils.py
│   ├── manager/
│   │   ├── __init__.py
│   │   ├── models/
│   │   │   └── use.py
|   |      └── company.py
|   |      └── prodcnver.py
|   |      └── prodTransfer.py
|   |      └── product.py
|   |      └── productcategory.py
|   |      └── productype.py
|          └── pwriteoff.py
|          └── shelf.py
|          └── store.py
            
│   │   ├── views/
│   │   │   └── supplier_view.py
│   │   └── schemas/
│   │       └── supplier_schema.py
│   ├── customer/
│   │   ├── __init__.py
│   │   ├── models/
│   │   │   └── order.py
│   │   ├── views/
│   │   │   └── order_view.py
│   │   └── schemas/
│   │       └── order_schema.py
│   ├── storekeeper/
│   │   ├── __init__.py
│   │   ├── models/
│   │   │   └── stock.py
│   │   ├── views/
│   │   │   └── stock_view.py
│   │   └── schemas/
│   │       └── stock_schema.py
│   ├── superadmin/
│   │   ├── __init__.py
│   │   ├── models/
│   │   │   └── role.py
│   │   ├── views/
│   │   │   └── user_management.py
│   │   └── schemas/
│   │       └── role_schema.py
│   └
├
└── 
