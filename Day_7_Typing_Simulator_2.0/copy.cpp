#include "main.h"

// Input Args: ReadFile, WriteFile, fileFormat, Speed

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
  char charsInFrontFlag = 'n'; // n = no, y = yes, a = add, r = remove
  int stepBackNum = 0;
  int SleepTime = 100000;
  srand(time(0));

  std::cout << "\n~RUNNING~\n";
  // Setup Input Stream

  input = &SetUpIstream(argc, argv, inFile, istreamGood);
  if (istreamGood != true)
  {
    return 1;
  }

  // Setup Output Stream
  if (argc > 2)
  {
    outFile.open(argv[2], std::ios_base::app);
    if (outFile.good() != true)
    {
      std::cout << "Unable to open \"" << argv[2] << "\"" << std::endl;
    }
    std::cout << "Output Fie: \"" << argv[2] << "\'" << std::endl;
  }

  // Check filetype for formatting
  if (argc > 3)
  {
    std::string fileType(argv[3]);
    if (fileType == "cpp")
    {
      std::cout << "Formatting: .cpp file" << std::endl;
    }
    else if (fileType == "html")
    {
      std::cout << "Formatting: .html file" << std::endl;
    }
    else if (fileType == "css")
    {
      std::cout << "Formatting: .css file" << std::endl;
    }
    else if (fileType == "js")
    {
      std::cout << "Formatting: .js file" << std::endl;
    }
    else
    {
      std::cout << "no filetype specified" << std::endl;
    }
  }

  // Setup Speed
  if (argc > 4)
  {
    std::string speedStr = argv[4];
    double speedInt = stod(speedStr);
    SleepTime = (240000 / (speedInt));
    std::cout << "Speed = " << speedInt << std::endl;
  }

  // Main Loop (reads chars from input and writes them to output)
  while (input->good() == true && input->peek() != EOF)
  {
    input->get(charBuffer);
    SleepRandom(lastChar, SleepTime);

    // Check -> MoveBack
    if (stepBackNum > 0)
    {
      MoveFilePos(outFile, -(stepBackNum));
    }

    // Write charBuffer
    outFile << charBuffer;
    outFile.flush();

    // Check -> add charsInFront
    if (charsInFront.length() > 0)
    {
      outFile << charsInFront;
      outFile.flush();
    }

    // Check -> Update stepBackNum
    if (charsInFrontFlag == 'a')
    {
      stepBackNum++;
      charsInFrontFlag = 'y';
    }
    if (charsInFrontFlag == 'r')
    {
      stepBackNum--;
      charsInFrontFlag = 'y';
    }

    // Checking for Symbols on inputStream
    switch (charBuffer)
    {
    case '{':
      charsInFront.push_back('}');
      charsInFrontFlag = 'a';
      break;
    case '(':
      charsInFront.push_back(')');
      charsInFrontFlag = 'a';
      break;
    case '}':
      if (charsInFront.length() > 0)
      {
        charsInFront.pop_back();
        charsInFrontFlag = 'r';
      }
      break;
    case ')':
      if (charsInFront.length() > 0)
      {
        charsInFront.pop_back();
        charsInFrontFlag = 'r';
      }
      break;
    default:
        /* Do Nothing */;
    }

    lastChar = charBuffer;
  }
  std::cout << "hi" << std::endl;
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
    std::cout << "Input Fie: \"" << argv[1] << "\'" << std::endl;
    return inFile;
  }
  else
  {
    return std::cin;
  }
}

void SleepRandom(char lastChar, int SleepTime)
{
  int randNum = rand();
  switch (lastChar)
  {
  case ' ':
    if ((randNum % 10) > 8)
    {
      usleep(SleepTime * 4);
    }
    else if ((randNum % 10) > 5)
    {
      usleep(SleepTime * 3);
    }
    else
    {
      usleep(SleepTime * 2.5);
    }
    break;
  case '\n':
    if ((randNum % 10) > 5)
    {
      usleep(SleepTime * 5);
    }
    else
    {
      usleep(SleepTime * 4);
    }
    break;
  default:
    if ((randNum % 10) > 8)
    {
      usleep(SleepTime * 1.6);
    }
    else if ((randNum % 10) > 5)
    {
      usleep(SleepTime * 1.2);
    }
    else
    {
      usleep(SleepTime);
    }
    break;
  }
}

void MoveFilePos(std::ofstream &outFile, int value)
{
  long pos = outFile.tellp();
  outFile.seekp(pos + value);
}
