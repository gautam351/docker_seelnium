# ---------------------------------------------------------
# Base Image
# ---------------------------------------------------------

FROM openvino/ubuntu18_runtime:2021.2

# ---------------------------------------------------------
# Standard Setup
# ---------------------------------------------------------

USER root

# this will install python 
RUN apt-get install python3 -y && \
    apt-get install python3-pip -y --fix-missing 



# make directories inside the docker container


RUN mkdir -p /home/selenium
RUN mkdir -p /home/selenium/backend
RUN mkdir -p /home/selenium/frontend



# ---------------------------------------------------------
# Copy Code
# ---------------------------------------------------------

COPY ./backend /home/selenium/backend/
# COPY ./frontend /home/selenium/frontend/


# frontend setup

WORKDIR /home/selenium/

# install nodejs

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - 
RUN apt-get install -y nodejs

RUN apt install nano
# # Install NVM
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash


# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# RUN source ~/.nvm/nvm.sh && nvm install 16.14.2 && nvm use 16.14.2
# build frontend

# WORKDIR /home/selenium/frontend
# RUN npm install 
# RUN npm run build


# backend

WORKDIR /home/selenium/backend
RUN npm install 

WORKDIR /home/selenium/backend
RUN chmod +x chromedriver

#install chrome


WORKDIR /home/selenium

RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | \
    tee -a /etc/apt/sources.list.d/google.list && \
    curl -sL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    apt-get update && \
    apt-get install -y google-chrome-stable libxss1

# Set up Chrome to run with --no-sandbox
RUN sed -i 's|HERE/chrome"|HERE/chrome" --no-sandbox|g' \
    /opt/google/chrome/google-chrome


# WORKDIR /home/selenium/backend
# RUN content=$(wget https://chromedriver.storage.googleapis.com/LATEST_RELEASE -q -O -) && \
#     echo $content

# RUN curl -X https://chromedriver.storage.googleapis.com/$content/chromedriver_linux64.zip && \
#     unzip chromedriver_linux64.zip && \
#     chmod 755 chromedriver
    
# Download and install ChromeDriver

    # mv chromedriver /usr/local/bin && \
    # chmod +x /usr/local/bin/chromedriver


ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8
EXPOSE 8006
EXPOSE 8008

# command to run the app
COPY start.sh .

# give necessary permissions
RUN chmod +x start.sh
RUN ls -l start.sh


WORKDIR /home/selenium 

# Start the React application
CMD ["/bin/bash", "-c", "./start.sh"]




