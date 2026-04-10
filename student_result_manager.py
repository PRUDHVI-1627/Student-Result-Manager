student = {}

while True:
    print("\n ----Student Manager App----")
    print("1. Add Student")
    print("2. View Students")
    print("3. Check Result")
    print("4. Exit")

    choice = input("Enter your Choice")

    #Add Students
    if choice =="1":
        name = input("Enter Student Name:")
        marks = marks(input("Enter marks:"))
        student[name] = marks
        print(f"{name} Successfully Added!")