import math

def compute(x):
    result = 0
    for i in range(1000000):
        result += math.sqrt(x + i)
    return result

numbers = [10, 20, 30]

for num in numbers:
    print(f"Value: {compute(num)}")
    print(f"Double: {compute(num) * 2}")
    print(f"Half: {compute(num) / 2}")
\ No newline at end of file