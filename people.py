import openpyxl
from openpyxl import Workbook

# Create a new workbook and select the active worksheet
wb = Workbook()
ws = wb.active

# Set the title of the worksheet (optional)
ws.title = "People Data"

# Define the headers for the columns
ws.append(['Name', 'Age'])

# Sample data matching your MongoDB schema (name and age)
people_data = [
    ['Alice', 25],
    ['Bob', 30],
    ['Charlie', 22],
    ['Diana', 28]
]

# Append the data to the worksheet
for person in people_data:
    ws.append(person)

# Save the workbook to a file
wb.save('people_data.xlsx')

print("XLSX file 'people_data.xlsx' created successfully!")
