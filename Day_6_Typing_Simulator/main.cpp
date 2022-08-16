#include "main.h"
// #define SLEEPTIME 180000
#define SLEEPTIME 280000

int main(int argc, char **argv, char **envp)
{
  // Declare Variables:
  std::istream *input;
  std::ifstream inFile;
  std::ofstream outFile;
  bool istreamGood = true;
  char charBuffer = '0';
  char lastChar = '\n';
  std::string charsInFront;
  char charsInFrontIndicator = 'n'; // n = no, y = yes, a = add, r = remove
  srand(time(0));

  // Setup Input Stream
  input = &SetUpIstream(argc, argv, inFile, istreamGood);
  if (istreamGood != true)
  {
    return 1;
  }

  // Setup Output Stream
  if (argc > 2)
  {
    outFile.open(argv[2]);
    if (outFile.good() != true)
    {
      std::cout << "Unable to open \"" << argv[2] << "\"" << std::endl;
    }
  }

  // Check filetype for formatting
  if (argc > 3)
  {
    std::string fileType(argv[3]);
    if (fileType == "cpp")
    {
      std::cout << "cpp file detected" << std::endl;
    }
    else if (fileType == "html")
    {
      std::cout << "html file detected" << std::endl;
    }
    else if (fileType == "css")
    {
      std::cout << "css file detected" << std::endl;
    }
    else if (fileType == "js")
    {
      std::cout << "js file detected" << std::endl;
    }
    else
    {
      std::cout << "no filetype specified" << std::endl;
    }
  }

  // Main Loop (reads chars from input and writes them to output)
  while (input->good() == true && input->peek() != EOF)
  {
    input->get(charBuffer);
    SleepRandom(lastChar);

    // Formatting
    if (charBuffer == '{')
    {
      charsInFront.append("}");
      charsInFrontIndicator = 'a';
    }
    if (charBuffer == '}')
    {
      charsInFront.pop_back();
      charsInFrontIndicator = 'r';
    }
    PrintToFile(outFile, charsInFront, charsInFrontIndicator, charBuffer);
    lastChar = charBuffer;
  }

  outFile.close();
  return 0;
}

//  This function points input to file or cin
std::istream &SetUpIstream(int argc, char **argv, std::ifstream &inFile, bool &istreamGood)
{
  if (argc > 1)
  {
    inFile.open(argv[1]);
    if (inFile.good() != true)
    {
      std::cout << "Unable to open \"" << argv[1] << "\"" << std::endl;
      istreamGood = false;
    }
    return inFile;
  }
  else
  {
    return std::cin;
  }
}

void SleepRandom(char lastChar)
{
  int randNum = rand();
  switch (lastChar)
  {
  case ' ':
    if ((randNum % 10) > 8)
    {
      usleep(SLEEPTIME * 4);
    }
    else if ((randNum % 10) > 5)
    {
      usleep(SLEEPTIME * 3);
    }
    else
    {
      usleep(SLEEPTIME * 2.5);
    }
    break;
  case '\n':
    if ((randNum % 10) > 5)
    {
      usleep(SLEEPTIME * 5);
    }
    else
    {
      usleep(SLEEPTIME * 4);
    }
    break;
  default:
    if ((randNum % 10) > 8)
    {
      usleep(SLEEPTIME * 1.6);
    }
    else if ((randNum % 10) > 5)
    {
      usleep(SLEEPTIME * 1.2);
    }
    else
    {
      usleep(SLEEPTIME);
    }
    break;
  }
}

void MoveFilePos(std::ofstream &outFile, int value)
{
  long pos = outFile.tellp();
  outFile.seekp(pos + value);
}

void PrintToFile(std::ofstream &outFile, std::string &charsInFront, char &charsInFrontIndicator, char charBuffer)
{
  // No Chars in front (print buffer)
  if (charsInFrontIndicator == 'n')
  {
    outFile << charBuffer;
    outFile.flush();
  }
  // Add Char in front (print buffer)
  else if (charsInFrontIndicator == 'a')
  {
    if (charsInFront.length() > 1)
    {
      MoveFilePos(outFile, -(charsInFront.length()));
    }
    outFile << charBuffer;
    outFile.flush();
    outFile << charsInFront;
    outFile.flush();
    charsInFrontIndicator = 'y';
  }
  // Remove Char in front (skip charBuffer)
  else if (charsInFrontIndicator == 'r')
  {
    if (charsInFront.length() == 0)
    {
      charsInFrontIndicator = 'n';
    }
    else if (charsInFront.length() > 0)
    {
      charsInFrontIndicator = 'y';
    }
  }
  // Yes, chars in front (move back, place buffer)
  else if (charsInFrontIndicator == 'y')
  {
    MoveFilePos(outFile, -(charsInFront.length()));
    outFile << charBuffer;
    outFile.flush();
    outFile << charsInFront;
    outFile.flush();
  }
  else
  {
    outFile << "This is an ERROR";
  }
}

// hello my {jgggg{hhh{h}}}
// okay {lehj}