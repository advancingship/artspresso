output "service_name" {
    value = aws_ecs_service.the_service.name
}


output "task_definition" {
    value = aws_ecs_task_definition.the_task.arn
}