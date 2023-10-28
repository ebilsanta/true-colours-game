FROM debian:bookworm-slim

WORKDIR /app

# Copy the native binary from the build stage
COPY --from=build target/backend /app/backend

# Run the application
CMD ["/app/backend"]