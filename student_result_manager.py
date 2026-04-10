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


    #View Students
    elif choice == "2":
        if not student:
            print("No Student Found!")
        else:
            for name,marks in student.items():
                print(name, ":", marks)


    #Check Result
    elif choice == "3":
        name = input("Enter Student Name: ")

        if name in student:
            marks = student[name]
            if marks >=40:
                print("PASS")
            else:
                print("FAIL")
        else:
            print("Student Not Found!")

    #Exit
    elif choice == "4":
        print("Exiting...")
        break
    else:
        print("In-valid Input")