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

vector<vector<int>> preInPost(TreeNode* root){
    stack<pair<TreeNode*, int>> st;
    st.push({root,1});
    vector<int> pre, in, post;
    if(root==NULL) return {};
    while(!st.empty()){
        auto it = st.top();
        st.pop();
        if(it.second == 1){
            pre.push_back(it.first->val);
            it.second++;
            st.push(it);
            if(it.first->left != NULL){
                st.push({it.first->left, 1});
            }
        }
        else if(it.second == 2){
            in.push_back(it.first->val);
            it.second++;
            st.push(it);
            if(it.first->right != NULL){
                st.push({it.first->right, 1});
            }
        }
        else{
            post.push_back(it.first->val);
        }
    }
return {pre, in, post};
}

int main(){
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(5);
    root->left->left = new TreeNode(3);
    root->left->right = new TreeNode(4);
    root->right->left = new TreeNode(6);
    root->right->right = new TreeNode(7);

    vector<vector<int>> ans = preInPost(root);

    cout << "Preorder: ";
    for (int x : ans[0]) cout << x << " ";
    cout << "\nInorder: ";
    for (int x : ans[1]) cout << x << " ";
    cout << "\nPostorder: ";
    for (int x : ans[2]) cout << x << " ";

return 0;
}