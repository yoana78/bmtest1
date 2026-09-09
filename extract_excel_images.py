import zipfile
import os
import openpyxl

xlsx_path = r'c:\coding\boomyung\product list.xlsx'
output_dir = r'c:\coding\boomyung\public\assets\products'
os.makedirs(output_dir, exist_ok=True)

# 1. Extract all images from xlsx zip (xl/media/)
with zipfile.ZipFile(xlsx_path, 'r') as z:
    media_files = [f for f in z.namelist() if f.startswith('xl/media/')]
    print(f"Found {len(media_files)} image files in excel.")
    
    for i, media_file in enumerate(media_files):
        ext = os.path.splitext(media_file)[1]
        filename = f"image_{i+1}{ext}"
        target_path = os.path.join(output_dir, filename)
        with open(target_path, 'wb') as f:
            f.write(z.read(media_file))
        print(f"Extracted: {filename}")

# 2. Check openpyxl drawing shapes/images if available
wb = openpyxl.load_workbook(xlsx_path, data_only=True)
for sheet in wb.sheetnames:
    ws = wb[sheet]
    images = getattr(ws, '_images', [])
    print(f"Sheet '{sheet}' has {len(images)} openpyxl images")
    for img in images:
        cell = img.anchor._from
        row = cell.row + 1
        col = cell.col + 1
        print(f"Image at Row {row}, Col {col}")
