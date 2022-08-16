#pragma once
#include <iostream>
#include <fstream>
#include <string>
#include <unistd.h> // Enables sleep() fucntion
#include <ctime>

int main(int, char **, char **);
std::istream &SetUpIstream(int, char **, std::ifstream &, bool &);
void SleepRandom(char);
void MoveFilePos(std::ofstream &, int);