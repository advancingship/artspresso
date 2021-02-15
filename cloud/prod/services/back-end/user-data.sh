#!/bin/bash

# ECS config
{
    echo "ECS_CLUSTER=cluster-artspresso"
} >> /etc/ecs/ecs.config

start ecs

echo "Done"
