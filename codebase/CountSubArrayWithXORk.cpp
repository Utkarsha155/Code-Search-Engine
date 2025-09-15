#include<bits/stdc++.h>
using namespace std;

int subArrayWithXORk(vector<int> &a, int k){
    int xr = 0;
    map<int, int> mpp;
    mpp[xr]++;
    int cnt =0;
    for(int i=0; i<a.size(); i++){
        xr = xr^a[i];
        int x = xr^k;
        cnt += mpp[x];
        mpp[xr]++;
    }
    return cnt;
}

int main(){
    vector<int> arr= {4, 2, 2, 6, 4};
    int k = 6;
    cout<<subArrayWithXORk(arr, k );
return 0;
}