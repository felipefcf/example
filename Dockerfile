FROM demoiselleframework/docker

MAINTAINER Demoiselle Framework <demoiselle.framework@gmail.com>

WORKDIR /opt/

RUN git clone -b docker  https://github.com/demoiselle/example.git --depth=1

WORKDIR /opt/example/backend/

RUN mvn clean package -Pwildfly-swarm && java -jar target/cep-swarm.jar

EXPOSE 8080
