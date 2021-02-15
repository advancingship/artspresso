output "VPCID" {
    value = aws_vpc.the_vpc.id
}


output "clusterID" {
    value = aws_ecs_cluster.the_cluster.id
}


output "cluster_name" {
    value = aws_ecs_cluster.the_cluster.name
}