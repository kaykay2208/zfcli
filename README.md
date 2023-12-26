# ZF CLI Tool

## Overview

Zoho CLI Tool is a command-line interface for Creating and updating ZF functions

## Prerequisites

Before using the Zoho CLI Tool, you need to register your application at the Zoho API Console to obtain your Client ID and Client Secret.

Visit [Zoho API Console](https://api-console.zoho.com/) and follow these steps:

1. **Register your Application:**
   - Obtain your Client ID and Client Secret.
   - Choose the appropriate Data Center and note the Domain URI.

2. **Zoho API Console Registration Prompt:**
   - Upon running the Zoho CLI Tool, it will prompt you for the following information:
     - Client ID
     - Client Secret
     - Data Center (Choose from the provided options)

## Installation

```bash
npm install -g zohof
```


Register Command
Run the following command to generate grant tokens and refresh tokens:


```bash
zfcli register
```

This command will interactively prompt you for the required information (Client ID, Client Secret, Data Center).

Data Center and Domain URI

Choose the appropriate Data Center and corresponding Domain URI:

United States (US): zoho.com
Europe (EU): zoho.eu
India (IN): zoho.in
Australia (AU): zoho.com.au
Japan (JP): zoho.jp

Important Notes

Client ID and Client Secret: Keep these credentials confidential.
Authorized Redirect URI: Set the URI endpoint for client-based applications.

Usage
function creation
``` bash
zfcli function <orgId> -c
```



