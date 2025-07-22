from server.extensions import db
from sqlalchemy_serializer import SerializerMixin

class Store(db.Model, SerializerMixin):
    __tablename__ = 'stores'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    shelf_name=db.Column(db.String(100))
    product_category=db.Column(db.String(100))
    product_subcategory=db.Column(db.String(100))
    vat = db.Column(db.String(50))
    # foreign key company id
    company_id=db.Column(db.Integer,db.ForeignKey('companies.id'))
    #reciprical relationship/mapping
    company=db.relationship('Company',back_populates="stores")

    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "shelf_name": self.shelf_name,
            "product_category": self.product_category,
            "product_subcategory": self.product_subcategory,
            "vat": self.vat,
            
            "company_name": self.company.name if self.company else None
        }

    def __repr__(self):
        return f'<Store {self.id},{self.name},{self.shelf_name},{self.product_category},{self.product_subcategory},{self.vat}>'
    