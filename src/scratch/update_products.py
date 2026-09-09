with open('src/data/products.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_content = content.replace("'sayoang'", "'natures'").replace('"sayoang"', '"natures"')

with open('src/data/products.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated products.js successfully!")
