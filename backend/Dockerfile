FROM debian:bookworm-slim

WORKDIR /app

# Copy the native binary from the build stage
COPY target/backend /app/backend

# Run the application
CMD ["/app/backend"]