#!/bin/bash
N=0;
jq -c '.[]' DiscoveryOutput.json |
  while read -r json ; do
    N=$((N+1))
    jq . <<< "$json" > "/Users/username/Desktop/Watson-Lab2/DiscoveryResults/discovery-${N}.json"
  done
