#include<bits/stdc++.h>
using namespace std;

int floor(vector<int> arr, int n, int x){
    int low = 0 , high = n-1;
    int ans = -1;
    while(low <= high){
        int mid = (low + high)/2;
        if(arr[mid] <= x){
            ans = arr[mid];
            low = mid+1;
        }
        else{
            high = mid -1;
        }
    }
    return ans;
}
int ceil(vector<int> arr, int n, int x){
    int low = 0 , high = n-1;
    int ans = -1;
    while(low <= high){
        int mid = (low + high)/2;
        if(arr[mid] >= x){
            ans = arr[mid];
            high = mid -1;
        }
        else{
            low = mid + 1;
        }
    }
    return ans;
}
int main(){
    vector<int> arr= {10, 20, 30, 40, 50};
    int ans1 = floor(arr, 5, 25);
    cout<<ans1<<endl;
    int ans2 = ceil(arr, 5, 25);
    cout<<ans2<<endl;
return 0;
}