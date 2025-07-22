from server.extensions import db
from sqlalchemy_serializer import SerializerMixin

class ProductTransfer(db.Model, SerializerMixin):
    __tablename__ = 'product_transfers'

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    from_location = db.Column(db.String(100), nullable=False)
    to_location = db.Column(db.String(100), nullable=False)
    remarks = db.Column(db.Text)
    product_id=db.Column(db.Integer,db.ForeignKey('products.id'), nullable=False)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    #one to many relationship
    product=db.relationship('Product',back_populates='product_transfers')
    
    def to_dict(self):
        return {
            "id": self.id,
            "quantity": self.quantity,
            "from_location": self.from_location,
            "to_location": self.to_location,
            "remarks": self.remarks,
            #"product_id": self.product_id,
            "product_name": self.product.name if self.product else None,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f"<Transfer {self.quantity} of Product {self.product_id} from {self.from_location} to {self.to_location}>"