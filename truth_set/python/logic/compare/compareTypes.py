def compareTypes(a, b):
    if not isinstance(a, type(b)):
        raise TypeError("Cannot compare values of different types")
    return a > b

print(compareTypes("1", 2))  
print(compareTypes("3", 2))  
print(compareTypes("abc", 2))