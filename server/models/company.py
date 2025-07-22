from server.extensions import db
from sqlalchemy_serializer import SerializerMixin

class Company(db.Model,SerializerMixin):
    __tablename__ = 'companies'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    address = db.Column(db.String(200))
    county = db.Column(db.String(50))
    sub_county = db.Column(db.String(50))
    city = db.Column(db.String(50))
    zip_code = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    #relationship
    stores=db.relationship('Store',back_populates="company")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "county": self.county,
            "sub_county": self.sub_county,
            "city": self.city,
            "zip_code": self.zip_code,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "stores": [store.name for store in self.stores]
        }

   
    def __repr__(self):
        return f'<Company{self.id},{self.name},{self.email},{self.phone},{self.address},{self.county},{self.sub_county},{self.city},{self.zip_code}>'