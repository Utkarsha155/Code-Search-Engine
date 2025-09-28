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

vector<int> bottomView(TreeNode* root){
    vector<int> ans;
    if(root==NULL) return ans;
    map<int, int> mpp;
    queue<pair<TreeNode* , int>> q;
    q.push({root, 0});
    while(!q.empty()){
        auto it = q.front();
        q.pop();
        TreeNode* node = it.first;
        int line = it.second;
        mpp[line] = node->val;
        if(node->left != NULL){
            q.push({node->left, line-1});
        }
        if(node->right != NULL){
            q.push({node->right, line+1});
        }
    }
    for(auto it: mpp){
        ans.push_back(it.second);
    }
    return ans;
}


int main(){
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    root->left->right->left = new TreeNode(8);
    root->left->right->right = new TreeNode(9);
    root->right->left = new TreeNode(6);
    root->right->right = new TreeNode(7);

    vector<int> ans = bottomView(root);
    
    for(auto it: ans){
        cout<<it<<" ";
    }
return 0;
}