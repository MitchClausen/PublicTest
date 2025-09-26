import uvicorn
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated

# DB
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session


class School(BaseModel):
    name: str

class Schools(BaseModel):
    schools: List[School]
    
app = FastAPI(debug=True)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




############ DB ############

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# I need to figure out what this is about 
db_dependency = Annotated[Session, Depends(get_db)]





memory_db = {"Schools": []}

######################## Local Memory ########################

# Get all schools in local memory  
@app.get(path="/getSchoolsLocal", response_model=Schools)
def get_schools_local():
    return  Schools(schools=memory_db["Schools" ])

# Add a school to local memory  
@app.post(path="/postSchoolLocal", status_code=status.HTTP_201_CREATED)
async def add_school_local(school : School, db: db_dependency) :
    db.add(school)
    db.commit()
    return  school

# Remove a school from local memory  
# ---------------------- TODO ----------------------
# @app.post(path="/removeSchoolLocal", response_model=School)
# def delete_school_local(school : School):
#     memory_db["Schools"] = [
#         item for item in memory_db["schools"]
#         if item != school
#     ]

######################## MySQL ########################

# # Get all schools in local memory  
# @app.get(path="/getSchools", response_model=Schools)
# def get_schools():
#     return  Schools(schools=memory_db["Schools" ])

# # Add a school to local memory  
# @app.post(path="/postSchool", response_model=School)
# def add_school(school : School):
#     memory_db["Schools"].append(school)
#     return  school



if __name__ == "__main__":
    # Runs the application and sets its location and ip
    uvicorn.run(app, host="0.0.0.0", port=8000)
# python .\main.py