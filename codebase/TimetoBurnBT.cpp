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

int findMaxDistance(map<TreeNode*, TreeNode*> &mpp, TreeNode* target){
    queue<TreeNode* > q;
    q.push(target);
    map<TreeNode*, int> vis;
    vis[target] = 1;
    int maxi = 0;
    while(!q.empty()){
        int sz = q.size();
        int fl = 0;
        for(int i=0; i<sz; i++){
            auto node = q.front();
            q.pop();
            if(node->left && !vis[node->left]){
                fl = 1;
                vis[node->left] = 1;
                q.push(node->left);
            }
            if(node->right && !vis[node->right]){
                fl = 1;
                vis[node->right] = 1;
                q.push(node->right);
            }
            if(mpp[node] && !vis[mpp[node]]){
                fl = 1;
                vis[mpp[node]] = 1;
                q.push(mpp[node]);
            }
        }
        if(fl) maxi++;
    }
    return maxi;
}

TreeNode* bfsToMapParents(TreeNode* root, map<TreeNode*, TreeNode*> &mpp, int start){
    queue<TreeNode*> q;
    q.push(root);
    TreeNode* res;
    while(!q.empty()){
        TreeNode* node = q.front();
        if(node->val == start) res = node;
        q.pop();
        if(node->left){
            mpp[node->left] = node;
            q.push(node->left);
        }
        if(node->right){
            mpp[node->right] = node;
            q.push(node->right);
        }
    }
    return res;
}


int main(){
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->right->left = new TreeNode(5);
    root->right->right = new TreeNode(6);
    root->left->left->right = new TreeNode(7);

    int start = 2;
    map<TreeNode*, TreeNode*> mpp;
    TreeNode* target = bfsToMapParents(root, mpp, start);
    int maxi = findMaxDistance(mpp, target);
    cout<<maxi<<endl;

return 0;
}