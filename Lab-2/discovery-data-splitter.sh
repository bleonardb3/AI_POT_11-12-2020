#!/bin/bash
N=0;
jq -c '.[]' DiscoveryOutput.json |
  while read -r json ; do
    N=$((N+1))
    jq . <<< "$json" > "/Users/<Mac username>/Documents/discovery-${N}.json"
  done
