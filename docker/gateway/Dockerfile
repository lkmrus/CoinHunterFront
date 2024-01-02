FROM nginx:1.25

RUN apt-get update -qq \
    && apt-get install -y curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*