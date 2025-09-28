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

void changeTree(TreeNode *root){
    if(root == NULL) return;
    int child = 0;
    if(root->left) child += root->left->val;
    if(root->right) child += root->right->val;
    if(child >= root->val) root->val = child;
    else{
        if(root->left) root->left->val = root->val;
        else if(root->right) root->right->val = root->val;
    }
    changeTree(root->left);
    changeTree(root->right);

    int tot = 0;
    if(root->left) tot += root->left->val;
    if(root->right) tot += root->right->val;
    if(root->left || root->right) root->val = tot;
}

void inorder(TreeNode* root){
    if(root==NULL) return;
    inorder(root->left);
    cout<<root->val<<" ";
inorder(root->right);
}

int main(){
    TreeNode* root = new TreeNode(2);
    root->left = new TreeNode(35);
    root->right = new TreeNode(10);
    root->left->left = new TreeNode(2);
    root->left->right = new TreeNode(3);
    root->right->left = new TreeNode(5);
    root->right->right = new TreeNode(2);

    changeTree(root);

    inorder(root);
    cout<<endl;

return 0;
}



