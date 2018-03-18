import csv
import sys

def getInf(line,table, language):
    index = 0

    while index != len(line) - 1:
        index = line.find("\t")
        currYear = line[index+1: index+5]
        for i in range(3):
            index = line.find(",")
            line = line[index+1:]
        endTail = line.find("\t")
        currBook = line[0: endTail]

        roundYear = int(int(currYear) / 10) * 10
        if roundYear in table.keys():
            num = table[roundYear][language] + int(currBook)
            table[roundYear][language] = num

        line = line[endTail:]
        index = 0
        # print(currYear, currBook)
    print(table)

def csvGenerate(table):
    csvFileName = "totalBooksNum.csv"
    with open(csvFileName, "w") as csvfile:
        writer = csv.writer(csvfile)
        #columns_name
        writer.writerow(["year","usEnglish","Chinese","Hebrew","Russian","Spanish"])
        list = sorted(table.keys())
        for i in list:
            print(i,table[i])
            writer.writerow([i,table[i][0],table[i][1],table[i][2],table[i][3],table[i][4]])





if __name__ == '__main__':

    file_chi = open("../data/Total/googlebooks-chi-sim-all-totalcounts-20120701.txt","rU")
    file_eng = open("../data/Total/googlebooks-eng-us-all-totalcounts-20120701.txt","rU")
    file_heb = open("../data/Total/googlebooks-heb-all-totalcounts-20120701.txt","rU")
    file_rus = open("../data/Total/googlebooks-rus-all-totalcounts-20120701.txt","rU")
    file_spa = open("../data/Total/googlebooks-spa-all-totalcounts-20120701.txt", "rU")
    list = [file_eng, file_chi, file_heb, file_rus, file_spa]

    rowTotalBooks = [] # usEng - 0, chi - 1, heb - 2, rus - 3, spa - 4
    year_lower_bound = 1800
    table = {}
    for i in range(1800,2010,10):
        table[i] = [0,0,0,0,0]
        # print(type(table[i]))

    for i, file in enumerate(list):
        for line in file:
            index = line.find("\t")
            getInf(line, table, i)

    csvGenerate(table)
    print("===== We Good =====")
