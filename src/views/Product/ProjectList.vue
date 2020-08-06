<template>
    <div>
        <el-table :data="projectData">
            <el-table-column show-overflow-tooltip prop="id" label="商品ID" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip prop="title" label="商品名称" width="200"></el-table-column>
            <el-table-column show-overflow-tooltip prop="image" label="商品图片" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip prop="sellPoint" label="商品卖点" width="300"></el-table-column>
            <el-table-column show-overflow-tooltip prop="price" label="商品价格" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip prop="num" label="商品数量" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip prop="descs" label="商品描述"></el-table-column>
            <el-table-column label="操作" width="145">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table> 
    </div>
</template>

<script>
export default {
  data() {
    return {
      projectData: [],
      page: 1
    };
  },
  mounted() {
    this.http(this.page);
    this.$bus.$on("onPage", page => {
      this.http(page);
    });
    this.$bus.$on("onAddSuccess", () => {
      this.http(this.page);
    });
    this.$bus.$on("onSearch", (search) => {
      this.projectData = search;
    });
  },
  methods: {
    http(page) {
      this.$api.projectList({ page: page }).then(res => {
        if (res.data.status === 200) {
          this.projectData = res.data.data;
        }
      });
    },
    /**
     * 数据编辑
     */
    handleEdit(index, row) {
      this.$bus.$emit("updateFlag",row)
    },
    // 数据删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .deleteProject({
              id: row.id
            })
            .then(res => {
              if (res.data.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.http(this.page);
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      
    }
  }
};
</script>

<style>
</style>

