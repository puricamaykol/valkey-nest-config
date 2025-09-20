docker exec -it 959262f0424b000b5d06a5104531e968b5a0da86167663c00b48cb213e8ccf6b valkey-cli --cluster create \
  valkey-7001:7001 valkey-7002:7002 valkey-7003:7003 \
  valkey-7004:7004 valkey-7005:7005 valkey-7006:7006 \
  --cluster-replicas 1

  docker exec -it 959262f0424b000b5d06a5104531e968b5a0da86167663c00b48cb213e8ccf6b valkey-cli -c -p 7001 cluster info
docker exec -it 959262f0424b000b5d06a5104531e968b5a0da86167663c00b48cb213e8ccf6b valkey-cli -c -p 7001 cluster nodes