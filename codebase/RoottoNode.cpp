#include<bits/stdc++.h>
using namespace std;

struct TreeNode{
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
    TreeNode(int data){
        val = data;
        left = NULL;
        right = NULL;
    }
};

bool getPath(TreeNode* root, vector<int> &arr, int x){
    if(!root) return false;
    arr.push_back(root->val);
    if(root->val == x) return true;
    if(getPath(root->left, arr, x) || getPath(root->right, arr, x)) return true;
    arr.pop_back();
    return false;
}

vector<int> solve(TreeNode* root, int k){
    vector<int> arr;
    if(root==NULL) return arr;
    getPath(root, arr, k);
    return arr;
}

int main(){
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    root->left->right->left = new TreeNode(6);
    root->left->right->right = new TreeNode(7);

    vector<int> ans = solve(root, 7);

    for(auto it: ans){
        cout<<it<<" ";
    }
return 0;
}