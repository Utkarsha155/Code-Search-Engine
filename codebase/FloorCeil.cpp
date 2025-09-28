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

int findCeil(TreeNode* root, int key){
    int ceil = -1;
    while(root){
        if(root->val == key){
            ceil = root->val;
            return ceil;
        }
        if(key > root->val){
            root = root->right;
        }
        else{
            ceil = root->val;
            root = root->left;
        }
    }
    return ceil;
}

int findFloor(TreeNode* root, int key){
    int floor = -1;
    while(root){
        if(root->val == key){
            floor = root->val;
            return floor;
        }
        if(key > root->val){
            floor = root->val;
            root = root->right;
        }
        else{
            root = root->left;
        }
    }
    return floor;
}

int main(){
    TreeNode* root = new TreeNode(10);
    root->left = new TreeNode(5);
    root->right = new TreeNode(13);
    root->left->left = new TreeNode(3);
    root->left->right = new TreeNode(6);
    root->right->left = new TreeNode(11);
    root->right->right = new TreeNode(14);
    root->left->left->left = new TreeNode(2);
    root->left->left->right = new TreeNode(7);
    root->left->right->right = new TreeNode(9);

    int ceil = findCeil(root, 8);
    int floor = findFloor(root, 12);
    cout<<"Ceil : "<<ceil<<endl;
    cout<<"Floor : "<<floor<<endl;
return 0;
}