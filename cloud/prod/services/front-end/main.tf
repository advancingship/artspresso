# Specify the family to find the latest active revision in that family.

provider "aws" {
  region = var.PROJECT_1_AWS_REGION_1
}

data "aws_subnet" "the_subnet" {
     tags = {
     	  Name = "prod_subnet"
     }
}


data "aws_ecs_cluster" "the_cluster" {
     cluster_name = "cluster-${var.PROJECT_1_NAME}"
}


data "aws_security_group" "the_security" {
     tags = {
     	  Name = "security-${var.PROJECT_1_NAME}"
     }
}


data "aws_ami" "amazon_linux_ecs" {
  most_recent = true

  owners = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn-ami-*-amazon-ecs-optimized"]
  }

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }
}


data "aws_ecs_task_definition" "the_task" {
  depends_on = [aws_ecs_task_definition.the_task]
  task_definition = aws_ecs_task_definition.the_task.family
}


data "aws_iam_role" "execution" {
     name = "ecs-execution-${var.PROJECT_1_NAME}"
}


resource "aws_ecs_service" "the_service" {
  name = "service-${var.PROJECT_1_NAME}"
  cluster         = data.aws_ecs_cluster.the_cluster.arn
  desired_count = 1
  # Track the latest ACTIVE revision
  task_definition = "${aws_ecs_task_definition.the_task.family}:${max(aws_ecs_task_definition.the_task.revision, data.aws_ecs_task_definition.the_task.revision)}"
}


resource "aws_ecs_task_definition" "the_task" {
  family                   = var.task_name
  network_mode             = "bridge"
  memory                   = 512
  requires_compatibilities = ["EC2"]
  execution_role_arn       = data.aws_iam_role.execution.arn
  container_definitions    = <<DEFINITION
  [
    {
      "entryPoint": [
        "sh",
        "-c"
      ],
      "portMappings": [
        {
          "hostPort": 80,
          "protocol": "tcp",
          "containerPort": 3000
        }
      ],
      "command": [
        "npm start"
      ],
      "workingDirectory": "${var.PROJECT_1_WORKING_DIRECTORY}",
      "memory": 512,
      "image": "${var.PROJECT_1_IMAGE_URI}",
      "interactive": true,
      "essential": true,
      "pseudoTerminal": true,
      "name": "${var.task_name}"
    }
  ]
DEFINITION
}


resource "aws_launch_template" "the_launch" {
  name_prefix   = "prefix_${var.PROJECT_1_NAME}"
  image_id      = data.aws_ami.amazon_linux_ecs.id
  instance_type = "t2.micro"

  iam_instance_profile {
      name = "ecs-instance-profile-${var.PROJECT_1_NAME}"
  }
  
  key_name = var.PROJECT_1_KEY_NAME
  user_data = filebase64("user-data.sh")

  vpc_security_group_ids = [data.aws_security_group.the_security.id]
}


resource "aws_autoscaling_group" "the_asg" {
  desired_capacity   = 1
  max_size 	     = 1
  min_size	     = 1
  vpc_zone_identifier= [data.aws_subnet.the_subnet.id]

  launch_template {
    id      = aws_launch_template.the_launch.id
    version = "$Latest"
  }
}


