from pydantic import BaseModel
from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
    DateTime,
    Table,
    Date,
    Enum,
    ForeignKeyConstraint,
    Index,
    Float,
)
from database import Base

class School(Base):
    __tablename__ = "Schools" #Table name within SQL lite
    name = Column("name", String, primary_key=True)

    def __intit__(self, name):
        self.name = name

    # Editing what gets shown when trying to print out a School
    # def __repr__(self):
    #     return f"{self.name}"