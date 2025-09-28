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

bool isLeaf(TreeNode* node) {
    return (node->left == NULL && node->right == NULL);
}

void addleftBoundary(TreeNode* root, vector<int> &res){
    TreeNode* cur = root->left;
    while(cur){
        if(!isLeaf(cur)) res.push_back(cur->val);
        if(cur->left) cur = cur->left;
        else cur = cur->right;
    }
}

void addRightBoundary(TreeNode* root, vector<int> &res){
    TreeNode* cur = root->right;
    vector<int> tmp;
    while(cur){
        if(!isLeaf(cur)) tmp.push_back(cur->val);
        if(cur->right) cur = cur->right;
        else cur = cur->left;
    }
    for(int i=tmp.size()-1; i>=0; i++){
        res.push_back(tmp[i]);
    }
}

void addLeaves(TreeNode* root, vector<int> &res){
    if(isLeaf(root)){
        res.push_back(root->val);
        return;
    }
    if(root->left) addLeaves(root->left, res);
    if(root->right) addLeaves(root->right, res);
}

vector<int> printBoundary(TreeNode* root){
    vector<int> res;
    if(!root) return res;
    if(!isLeaf(root)) res.push_back(root->val);
    addleftBoundary(root, res);
    addLeaves(root, res);
    addRightBoundary(root, res);
    return res;
}

int main(){
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(7);
    root->left->left = new TreeNode(3);
    root->left->left->right = new TreeNode(4);
    root->left->left->right->left = new TreeNode(5);
    root->left->left->right->right = new TreeNode(6);
    root->right->right = new TreeNode(8);
    root->right->right->left = new TreeNode(9);
    root->right->right->left->left = new TreeNode(10);
    root->right->right->left->right = new TreeNode(11);

    vector<int> ans = printBoundary(root);
    cout<<"Size of ans = "<<endl;
    for(auto i=0;  i<ans.size(); i++){
        cout<<ans[i]<<" ";
    }
    cout<<endl;

return 0;
}