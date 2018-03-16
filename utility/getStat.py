import sys

def getYear(line):
    # print(len(line))
    # print(line)
    a = line.find("\t")
    b = a+1
    # print(a, line)
    # print(line[b:b+4])
    return line[b:b+4]

def getNum(line):
    line = line.replace("\t", ",")
    index = 0
    for i in range(2):
        index = line.find(",")
        line = line[index + 1:]
    index = line.find(",")
    return line[index+1:]

if __name__ == '__main__':
    keyword = sys.argv[1] + "_NOUN"
    table = {}
    year_lower_bound = 1800
    year_upper_bound = 1810

    for i in range((2010 - 1800) / 10):
        table[year_lower_bound] = 0
        year_lower_bound += 10
        sorted(table.keys())

    nums = []

    file_object = open("../data/Chinese/googlebooks-chi-sim-all-1gram-20120701-g", "rU")
    for i, line in enumerate(file_object):
        # print(line)
        if keyword in line:
            year = getYear(line)
            num_year = int(getNum(line))
            year_round = int(int(year) / 10) * 10
            if year_round in table:
                num = table[year_round] + num_year
                table[year_round] = num
                print(year_round, num)

    

