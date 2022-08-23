#pragma once
#include <iostream>
#include <fstream>
#include <string>
#include <unistd.h> // Enables sleep() fucntion
#include <ctime>

int main(int, char **, char **);
std::istream &SetUpIstream(int, char **, std::ifstream &, bool &);
void SleepRandom(char, int);
void MoveFilePos(std::ofstream &, int);
void BackSpace(std::ofstream &, int);
