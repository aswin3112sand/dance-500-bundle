# syntax=docker/dockerfile:1

# Build the Spring Boot application
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests package

# Run the packaged application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/dance-500-platform-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
