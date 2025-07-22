from server.extensions import db
from sqlalchemy_serializer import SerializerMixin

class Supplier(db.Model, SerializerMixin):
    __tablename__ = 'suppliers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True)
    phone = db.Column(db.String(50))
    address = db.Column(db.String(255))
    contact_person = db.Column(db.String(100))
    contact_number = db.Column(db.String(50))
    product_name = db.Column(db.String(120), nullable=False)
    balance = db.Column(db.Float, default=0.0)
    package_mode = db.Column(db.String(100))
    notes = db.Column(db.Text)
    apply_vat = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "contact_person": self.contact_person,
            "contact_number": self.contact_number,
            "product_name": self.product_name,
            "balance": self.balance,
            "package_mode": self.package_mode,
            "notes": self.notes,
            "apply_vat": self.apply_vat,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
    def __repr__(self):
        return f"<Supplier {self.name} - {self.email}>"