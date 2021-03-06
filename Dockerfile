﻿FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app
COPY *.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o out
WORKDIR /app/out
CMD ASPNETCORE_URLS="https://*:8000" dotnet ABTestTask.dll