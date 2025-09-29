#include<bits/stdc++.h>
using namespace std;

int func(int mid, int n, int m){
    long long ans = 1;
    for(int i=1; i<=n; i++){
        ans = ans *mid;
        if(ans > m) return 2;
    }
    if(ans == m) return 1;
    return 0;
}

//return 1 if == m
//return 2 if > m
//return 0 if < m

int findnthRoot(int n, int m){
    int low = 0, high = m;
    while(low <= high){
        int mid = (low+high)/2;
        int midN = func(mid, n, m);
        if(midN == 1) return mid;
        else if(midN == 0) low = mid+1;
        else high = mid -1;
    }
    return -1;
}
int main(){
    int n, m;
    cin>>n>>m;
    cout<<findnthRoot(n, m)<<endl;
return 0;
}