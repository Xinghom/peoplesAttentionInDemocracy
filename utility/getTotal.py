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

        roundYear = int(currYear / 10) * 10
        if roundYear in table.keys():



        line = line[endTail:]
        index = 0
        print(currYear, currBook)








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
        table[i] = []

    t = "	2007,826433846,6121305,7291	2008,752279725,5463702,6436	2009,442976761,2460245,2557	"
    print(len(t))
    print(t, "text")

    for i, file in enumerate(list):
        for line in file:
            index = line.find("\t")
            getInf(line, table, i)
    #
    #         roundYear = int(currYear / 10) * 10
    #         if roundYear in table.keys():
    #             # table[roundYear] = table[roundYear] + int(currBook)
    #             # print(roundYear, table[roundYear])
    #
    # csvGenerate()
    print("===== We Good =====")
