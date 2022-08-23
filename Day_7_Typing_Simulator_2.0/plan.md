Typing Simulator!

This program will read characters from one file and write them to another file, to make a perfect copy.
If the first arg is "nofile", then it will read words from cin.

It will run from the command line with two arguments:

1. The file to read from
2. The file to write to

Pseudo-Code:

int main(int argc, char **argv, char **envp) {

// Declare Variables:
std::istream \*input;
std::ifstream inFile;
std::ofstream outFile;
bool istreamGood;
bool ostreamGood;
string wordBuffer;

input = &SetUpIstream(argc, argv, inFile, istreamGood);
if(istreamGood != true) return 1;

// TODO Set up OutFile Stream

// Main Loop (reads chars from input and writes them to output)
while(input.good() == true && input.peek() != EOF) {
getline(input, wordBuffer);

outFile << string << endl;

}
}
